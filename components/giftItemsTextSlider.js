export default function giftItemsTextSlider(){
    return (
        <Slider {...settings}>
            {props.data.map((slide,slideIndex)=>{
                return (
                    <div className={`giftItem`} key={`desktop_text_slide_${slideIndex}`}>
                        <div className="itemHeading one canelaThin font24">{slide.heading}</div>
                        <div className="itemDesc one anoHalfRegular font16">{slide.description}</div>
                    </div>
                )
            })}
        </Slider>
    )
}