import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { userEmailState } from "../store/selectors/userEmail";

export const Landing = () => {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"}>
                        Coursera Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    {!userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={"https://upskillwise.com/wp-content/uploads/2020/04/Coursera-New-Banner.png"} width={"100%"} sizes="large" alt="Coursera Image" />
            </Grid>
        </Grid>
    </div>
}