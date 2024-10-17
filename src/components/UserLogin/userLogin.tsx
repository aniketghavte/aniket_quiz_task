"use client"
import React, { useState } from 'react'
import styles from "./Login.module.css"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Spinner } from '@nextui-org/react'

export default function UserLogin() {

    const router = useRouter()

    const [isRandomUserGenerated, setIsRandomUserGenerated] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const generateRandomUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const email = Math.random().toString(36).substring(2, 8) + "@upraised.com"
        const password = Math.random().toString(36).substring(2, 8)
        const name = Math.random().toString(36).substring(2, 5)
        setUser({
            name: name,
            email: email,
            password: password
        })
        setIsRandomUserGenerated(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post("/api/user/createDummyUser", {
                name: user.name,
                email: user.email,
                password: user.password
            }).then((res) => {
                console.log(res)
                router.push("/quiz")
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
        }   
    }

  return (
    <div className={styles.app_login_block}>
        <form className={styles.app_login_form} onSubmit={handleSubmit}>
            <div className={styles.form_input}>
                <label htmlFor="name">Name</label>
                <input disabled value={user.name} type="text" placeholder="name" />
            </div>
            <div className={styles.form_input}>
                <label htmlFor="email">Email</label>
                <input disabled value={user.email} type="email" placeholder="email" />
            </div>
            <div className={styles.form_input}> 
                <label htmlFor="password">Password</label>
                <input disabled value={user.password} type="password" placeholder="password" />
            </div>
            {
                isRandomUserGenerated ? (
                    <button className={styles.app_login_form_button}  type="submit">
                        {
                            isLoading ? <Spinner color='default' size='lg'/> : "Create User"
                        }
                    </button>
                ) : (
                    <button className={styles.app_login_form_button} style={{
                        border: "2px solid transparent"
                    }} onClick={generateRandomUser}>Generate Random User</button>
                )
            }
            
        </form>
    </div>
  )
}
