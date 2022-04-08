import React, { useEffect, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'


export const getProps = () => {
    const props = {
        state: "No props available yet"
    }
    return props
}

const ViewToggler = (props) => {
    const {
        topContent = "",
        bottomContent = "",
    } = props

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
        useWindowSize();
    }

    return(
        <Container>
            <ContainerAnchor height={height}>
                {
                    ShowWindowDimensions()
                }
                <PaddedContainer>
                    <ContentContainer>
                        <TopContent>{topContent}</TopContent>
                        <BottomContent>{bottomContent}</BottomContent>
                    </ContentContainer>
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
    height: 100%;
    background-color: white;
`
const PaddedContainer = styled.div`
    width: calc(100% - 40px);
    margin: auto;
    height: 100%;
    position: relative;
`
const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
const BottomContent = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 20px;
`
const TopContent = styled.div`
    padding-top: 20px;
    width: 100%;
`

export default ViewToggler