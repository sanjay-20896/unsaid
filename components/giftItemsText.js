export default function GiftItemsText(props){
    return (
        <>
            <div className="giftItems">
                {props.data.map((slide,slideIndex)=>{
                    
                    return (
                        <div className={`giftItem ${props.alreadyUnlocked?"alreadyUnlocked":""} ${slideIndex==props.activeSlideIndex?"":"grey"}`} key={`desktop_text_slide_${slideIndex}`}>
                            <div className="itemHeading canelaThin font24">{slide.heading}</div>
                            <div className="itemDesc anoHalfRegular font16">{slide.description}</div>
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
                
            `}</style>
        </>
    )
}