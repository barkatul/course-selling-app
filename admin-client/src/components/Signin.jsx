import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../config";
import { userState } from "../store/atoms/user";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return <div>
        <div style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant={"h6"}>
                Welcome to Coursera. Sign In below
            </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20}}>
                <TextField
                onChange={(e) => {
                    let e1 = e.target;
                    setEmail(e1.value);
                }}
                fullWidth={true}
                label="Email"
                variant="outlined">
                </TextField>
                <br /><br />
                <TextField
                onChange={(ee) => {
                    let e2 = ee.target;
                    setPassword(e2.value);
                }}
                fullWidth={true}
                label="Password"
                variant="outlined"
                type={"password"}>
                </TextField>
                <br /><br />
                <Button 
                size={"large"}
                variant="contained"
                onClick={
                    async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username: email,
                            password: password
                        },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const data = res.data;

                        localStorage.setItem("token", data.token);
                        setUser({
                            userEmail: email,
                            isLoading: false
                        })
                        navigate("/courses")
                    }
                }>
                    Signin
                </Button>
            </Card>
        </div>
    </div>
}

export default Signin;