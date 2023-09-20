import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CartPage from "../pages/CartPage";
import { AuthContext } from "../pages/AuthContext";
import {Auth} from "../pages/Login";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CartPage">
                <CartPage/>
            </ComponentPreview>
            <ComponentPreview path="/Auth">
                <AuthContext/>
            </ComponentPreview>
            <ComponentPreview path="/Auth">
                <Auth/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews