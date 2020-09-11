import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {PanelHeader, Panel, CardGrid, Card, Group, Button, Input} from "@vkontakte/vkui";

const Home = ({id, go, fetchedUser, setImg }) => {
    const [images, setImages] = useState([
        'https://risovach.ru/upload/2019/04/generator/roskoshnyy-vinni-puh_205315570_orig_.png',
        'https://i.imgflip.com/1bij.jpg'
    ])
    const canvasRef = React.useRef(null)
    const [top, setTop] = useState(null)
    const [bottom, setBottom] = useState(null)

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes/', {
            method: 'GET',

        })
            .then(response=>response.json())
            .then(response=>console.log(response))
            .catch(e=>console.log(e))
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader>
                Мемчик
            </PanelHeader>
            <Group separator="hide">
                <CardGrid>
                    {
                        images.map(image=>{
                            return (
                                <Card
                                    size="s"
                                    onClick={()=>{
                                        setImg(image);
                                        go('constructor')
                                    }}
                                >
                                    <div style={{
                                        height: 96,
                                        backgroundImage: 'url(' + image + ')',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center 35%',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: 13
                                    }} />
                                </Card>
                            )
                        })
                    }
                </CardGrid>
            </Group>
        </Panel>
    );
}

export default Home;