import React, {useEffect, useState} from "react"

import "./assets/popup.css"

import { faTwitch, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCog, faEye, faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface TwitchData {
    brodcast_type: string
    created_at: string
    description: string
    display_name: string
    id: string
    login: string
    offline_image_url: string
    profile_image_url: string
    type: string
    view_count: number
}
const getTwitchData = async (user_id: string) => {
    const response = await fetch(`https://api.twitch.tv/helix/streams?${user_id}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer jostpf5q0puzmxmkba9iyug38kjtg',
            'Client-Id': 'wbmytr93xzw8zbg0p1izqyzzc5mbiz'
        }
    })
    const data = await response.json()
    return data.data as TwitchData
}

function IndexPopup() {
    const [data, setData] = useState<TwitchData | null>(null)
    const [isLive, setIsLive] = useState(false)

    const click = () => {
        console.log("click")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getTwitchData("186509013").then((data) => {
                console.log(data)
                setData(data)
                setIsLive(data.brodcast_type === "live")
            })
        }, 1000);
    })

    return (
        <div>
            <div className="floating-button" onClick={click}>
                <div className="circle" />
                <FontAwesomeIcon className="settings" icon={faCog} size="1x" color={"#1f5dcd"} />
            </div>
            <div className="row center header">
                <h1 className="streamer-title">Squntt_</h1>
            </div>
            <hr />
            <div className="row dark">
                <FontAwesomeIcon className="rec" icon={faCircle} size="2x" />
                <h1 className="title">{isLive ? "En Ligne" : "Hors-Ligne"}</h1>
            </div>
            <div className="row left-center blue">
                <FontAwesomeIcon className="icon" icon={faEye} />
                <p>-</p>
                <div className="space"></div>
                <FontAwesomeIcon className="icon" icon={faGamepad} />
                <p></p>
            </div>
            <hr />
            <div className="row dark content-media">
                <a className="button" target="_blank" href="https://twitter.com/quentinsqr">
                    <FontAwesomeIcon className="icon" icon={faTwitter} />
                </a>
                <a className="button" target="_blank" href="https://www.twitch.tv/squntt_">
                    <FontAwesomeIcon className="icon" icon={faTwitch} />
                </a>
                <a className="button" target="_blank" href="https://www.youtube.com/user/jidafe">
                    <FontAwesomeIcon className="icon" icon={faYoutube} />
                </a>
            </div>
        </div>
    )
}

export default IndexPopup
