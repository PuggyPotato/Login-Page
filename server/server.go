package main

import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
)

var users = make(map[string] string)

type UserData struct{
	Name string `json:"name"`
	Password string `json:"password"`
}

func handleRegister(w http.ResponseWriter,r *http.Request){
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

	response := map[string]string{"message":"User Received!",}
	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(response)
}

func handleLogin(w http.ResponseWriter,r *http.Request){

}

func main(){

}