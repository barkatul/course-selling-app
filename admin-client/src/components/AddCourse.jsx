import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config.js";


function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);

    return <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20, marginTop: 30, height: "100%"}}>
                <TextField
                style={{
                    marginBottom: 10
                }}
                onChange={(e) => {
                    let e1 = e.target;
                    setTitle(e1.value);
                }}
                fullWidth={true}
                label="Title"
                variant="outlined">
                </TextField>

                <TextField
                style={{
                    marginBottom: 10
                }}
                onChange={(ee) => {
                    let e2 = ee.target;
                    setDescription(e2.value);
                }}
                fullWidth={true}
                label="Description"
                variant="outlined">
                </TextField>

                <TextField
                style={{
                    marginBottom: 10
                }}
                onChange={(ee) => {
                    let e2 = ee.target;
                    setImage(e2.value);
                }}
                fullWidth={true}
                label="Image Link"
                variant="outlined"
                >
                </TextField>

                <TextField style={{
                    marginBottom: 10
                }}
                onChange={(ee) => {
                    let e2 = ee.target;
                    setPrice(e2.value);
                }}
                fullWidth={true}
                label="Price"
                variant="outlined">
                </TextField>

                <Button 
                size={"large"}
                variant="contained"
                onClick={ async () => {
                    await axios.post(`${BASE_URL}/admin/courses`, {
                        title: title,
                        description: description,
                        imageLink : image,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    alert("Added course!");
                } }>
                    Add Course
                </Button>
            </Card>
        </div>
    </div>
}

export default AddCourse;