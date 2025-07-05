package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5"
)

var users = make(map[string] string)
var conn *pgx.Conn

type UserData struct{
	Name string `json:"name"`
	Password string `json:"password"`
}

func withCORS(h http.HandlerFunc) http.HandlerFunc{
	return func(w http.ResponseWriter,r * http.Request){
		//Allow all origin for cors
		w.Header().Set("Access-Control-Allow-Origin","*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		//Handle preflight (OPTIONS request)
		if r.Method == http.MethodOptions{
			w.WriteHeader(http.StatusOK)
			return
		}

		h(w,r)
	}
}

func handleRegister(w http.ResponseWriter,r *http.Request){
	log.Println("handleRegister called")
	if r.Method != http.MethodPost{
		http.Error(w,"Only POST Allowed",http.StatusMethodNotAllowed)
		return
	} 

	var user UserData
	if err := json.NewDecoder(r.Body).Decode(&user);err !=nil{
		http.Error(w,"Bad JSON",http.StatusBadRequest)
		return
	}

	log.Println("Received User:",user)

	//Check If User Exist
	var exists bool
	query := "SELECT EXISTS (SELECT 1 FROM public.users WHERE name = $1)"
	err := conn.QueryRow(context.Background(), query, user.Name).Scan(&exists)

	if err !=nil{
		log.Println("DB check error",err)
		http.Error(w,"Database Error",http.StatusInternalServerError)
		return
	}

	if exists{
		http.Error(w,"User already exists",http.StatusConflict)
		return
	}

	//Saving user to PostGres
	_,err = conn.Exec(
		context.Background(),
		"INSERT INTO public.users (name, password) VALUES ($1, $2)",
		user.Name,user.Password,
	)

	if err != nil{
		log.Println("DB insert error:",err)
		http.Error(w,"Failed To Save User",http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message":"User Received!",}
	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(response)
}

func handleLogin(w http.ResponseWriter,r *http.Request){
	log.Println("handleLogin called")

	if r.Method !=http.MethodPost{
		http.Error(w,"BAD JSON",http.StatusMethodNotAllowed)
		return
	}

	var user UserData
	if err := json.NewDecoder(r.Body).Decode(&user);err !=nil{
		http.Error(w,"Bad JSON",http.StatusBadRequest)
		return
	}

	log.Println("Login attempt:",user)

	var storedPassword string
	query := "SELECT password FROM public.users WHERE name = $1"
	err :=conn.QueryRow(context.Background(),query,user.Name).Scan(&storedPassword)

	log.Printf("Raw input: Name='%s', Password='%s'", user.Name, user.Password)


	if err != nil{
		log.Println("Login DB error:",err)
		http.Error(w,"Invalid username or password",http.StatusUnauthorized)
		return
	}

	//Check If Password Match
	if user.Password != storedPassword{
		http.Error(w,"Invalid username or password",http.StatusUnauthorized)
		return
	}

	//Success
	response :=map[string]string{"message":"Login Succesful"}
	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(response)

}

func main(){
	var err error
	conn,err = pgx.Connect(context.Background(),"postgres://postgres:callmegod@localhost:5432/myapp")
	
	
	if err !=nil{
		log.Fatal("Unable to connect to Database:",err)
	}
	defer conn.Close(context.Background())
	fmt.Println("Connected To PostgreSQL.")
	fmt.Println("Server Is Running on localhost:8080")

	//Routes
	http.HandleFunc("/register",withCORS(handleRegister))
	http.HandleFunc("/login",withCORS(handleLogin))

	//Start Http Server
	log.Fatal(http.ListenAndServe(":8080",nil))
}