import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {PanelHeader, Panel, PanelHeaderBack, Cell
    , Div, Button, Input, FormLayout} from "@vkontakte/vkui";
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24Attachments from '@vkontakte/icons/dist/24/attachments';

const Constructor = ({id, image, go}) => {
    let schema = new Image()
    schema.src = image
    const [img, setImg] = useState(schema);
    const canvasRef = React.useRef(null)
    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [genStatus, setGenStatus] = useState(false)
    const [memes, setMemes] = useState(image)

    useEffect(()=>{
        generate()
    })

    useEffect(()=>{
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let imm = document.getElementById('kart');
        let rotate = imm.height / imm.width
        imm.width = window.innerWidth
        imm.height = window.innerWidth * rotate
        ctx.drawImage(imm, 0, 0)
        //ctx.drawImage(img, 0, 0)
    }, [])
    function writeTop(text) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "#FFF";
        ctx.font = 'bold 30px impact';
        let lineHeight = getFontHeight(ctx.font);
        let maxWidth = canvas.width;
        let marginTop = getFontHeight(ctx.font);
        let words = text.split(" ");
        let countWords = words.length;
        let line = "";
        for (let n = 0; n < countWords; n++) {
            let testLine = line + words[n] + " ";
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
                let marginLeft = ((canvas.width - ctx.measureText(line).width)/2)
                ctx.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        let marginLeft = ((canvas.width - ctx.measureText(line).width)/2)
        ctx.fillText(line, marginLeft, marginTop);
    }
    function writeBottom(text) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let maxWidth = canvas.width;
        let marginTop;
        ctx.font = 'bold 30px impact';
        ctx.measureText(text).width > maxWidth ?
            marginTop = canvas.height - getFontHeight(ctx.font)-10 :
            marginTop = canvas.height - getFontHeight(ctx.font)+20
        ctx.fillStyle = "#FFF";
        let lineHeight = getFontHeight(ctx.font);
        let words = text.split(" ");
        let countWords = words.length;
        let line = "";
        for (let n = 0; n < countWords; n++) {
            let testLine = line + words[n] + " ";
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
                let marginLeft = ((canvas.width - ctx.measureText(line).width)/2)
                ctx.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        let marginLeft = ((canvas.width - ctx.measureText(line).width)/2)
        ctx.fillText(line, marginLeft, marginTop);
    }
    function getFontHeight(font) {
        let parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        var height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
    }
    function generate(){
        setGenStatus(true)
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0,0,canvas.width,canvas.height)
        let imm = document.getElementById('kart');
        let rotate = imm.height / imm.width
        imm.width = window.innerWidth
        imm.height = window.innerWidth * rotate
        ctx.drawImage(imm, 0, 0)
        writeTop(top)
        writeBottom(bottom)
        setMemes(canvas.toDataURL("image/png"))
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={()=>go('home')} />}>
                Создание мема
            </PanelHeader>
            <img crossorigin={'anonymous'} id={'kart'} width={window.innerWidth} src={image}/>
            <img width={window.innerWidth} src={memes} />
            <canvas
                style={{display: 'none'}}
                ref={canvasRef}
                width={img.width}
                height={img.height || '300'}
            />
            {
                top !== '' || bottom !== '' ?
                    <React.Fragment>
                        <Div style={{display: 'flex'}}>
                            <Button before={<Icon24ShareOutline/>} size="l" stretched style={{ marginRight: 8 }}>На стену</Button>
                            <Button before={<Icon24LogoInstagram/>} size="l" stretched>В историю</Button>
                        </Div>
                        <Div>
                            <Button before={<Icon24Attachments/>} size="xl">Сохранить в библиотеке</Button>
                        </Div>
                    </React.Fragment> :
                    null
            }
            <FormLayout>
                    <Input
                        status={
                            top.length>0 ?
                                top.length < 50 ? 'valid' : 'error' :
                                null
                        }
                        bottom={top.length+'/50'}
                        top="Текст верхней строки"
                        placeholder={'Напишите, или оставьте поле пустым'}
                        value={top}
                        onChange={e=>setTop(e.target.value)}/>
                    <Input
                        status={
                            bottom.length>0 ?
                                bottom.length < 50 ? 'valid' : 'error' :
                                null
                        }
                        bottom={bottom.length+'/50'}
                        top="Текст нижней строки"
                        placeholder={'Напишите, или оставьте поле пустым'}
                        value={bottom}
                        onChange={e=>setBottom(e.target.value)}/>
                        <Cell multiline>Обратите внимание: для корректного переноса строк между словами обязательно должны быть пробелы.</Cell>
            </FormLayout>
        </Panel>
    );
}

export default Constructor;