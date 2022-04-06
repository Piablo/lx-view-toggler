import React, { useEffect, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'


export const getConfig = () => {
    const config = {
        state: "No config available yet"
    }
    return config
}

const ViewToggler = (props) => {
    const {
        config
    } = props
    const content = props.children;

    //useStates
    const [viewSizeType, setViewSizeType] = useState()
    const [height, setHeight] = useState(null)
    //useEffects
    useEffect(() => {
        if(viewSizeType){
            switch(viewSizeType){
                case 'SMALL':
                    setHeight('100%');
                    break
                case 'LARGE': 
                    setHeight(null);
                    break
                default:
                    return null
            }
        }

    }, [viewSizeType])
    //functions
    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);

        useEffect(() => {
            
            if(size){
                const width = size[0]
                if(width <= 800){
                    setViewSizeType('SMALL')
                }else{
                    setViewSizeType('LARGE')
                }
            }
        }, [size])


        return size;
    }
    const ShowWindowDimensions = () => {
        const [width, height] = useWindowSize();
    }

    return(
        <Container>
            <ContainerAnchor height={height}>
                {
                    ShowWindowDimensions()
                }
                <PaddedContainer>
                    <ContentContainer>{content}</ContentContainer>
                </PaddedContainer>
                
            </ContainerAnchor>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgb(45,45,45);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContainerAnchor = styled.div`
    width: 100%;
    max-width: 800px;
    height: ${props => props.height};
    background-color: white;
`
const PaddedContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    width: calc(100% - 40px);
    margin: auto;
`
const ContentContainer = styled.div`
    width: 100%;
`

export default ViewToggler