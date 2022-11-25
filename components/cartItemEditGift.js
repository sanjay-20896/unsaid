import {useState,useRef, useEffect} from 'react'
import { connect } from "react-redux"
import Caret from './caret'
import Input from './input'
import {getColorOptions,getProductBasedOnColor,getProductBasedOnColorAndDiamonds,getProductBasedOnColorAndCordColor} from '../functions'
import isEqual from 'lodash/isEqual'
import Loader from './loader'
import {TOKEN_VAR_NAME,DEFAULT_ENGRAVING_CHARACTER_LIMIT,HIDE_UNDO_MESSAGE_TIMER, MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config'
import {storeSelection, updateCartLikes} from '../redux/actions'
import LazyImage  from './lazyImage'
import {tempSaveCartItem} from '../redux/actions'
import {getObjectToPushToWishlist,getProductImage,formatPrice} from '../functions'
import CordColors from './cordColors'
import {onRemoveSingleItemFromCart} from '../gtmFunctions'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables'
import useTranslation from 'next-translate/useTranslation'

function CartItemEditGift(props){
    const {t}=useTranslation('common')
    // meta data
    let metaData = JSON.parse(props.item.comment)
    let {mainJewelProductId,selectedJewelProductId,selectedItem,boxChoice,cardChoice,noteText,engravingText} = metaData
    
    //all gift boxes 
    let giftBoxProductIds = props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[0].products
    let giftBoxProducts = props.gifting.bundle[props.item.product.product].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
    //sections
    let giftBoxSection = props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[0]
    let postCardSection = props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[1]
    let jewelSection =  props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[2]
    //all post cards 
    let postCardProductIds = props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[1].products
    let postCardProducts = props.gifting.bundle[props.item.product.product].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
    
    //selected box
    let boxProductBundleItem = props.item.bundle.find(it=>it.item==boxChoice)
    let boxProductId = !!boxProductBundleItem?boxProductBundleItem.product:null
    let boxProduct = !!boxProductId?props.cache.products[boxProductId]:null
    
    //selected card
    let cardProductBundleItem = props.item.bundle.find(it=>it.item==cardChoice)
    let cardProductId = !!cardProductBundleItem?cardProductBundleItem.product:null
    let cardProduct = !!cardProductId?props.cache.products[cardProductId]:null
    //main jewel
    let mainJewelProduct = props.cache.products[mainJewelProductId]

    //selected jewel
    let selectedJewelProduct = props.cache.products[selectedJewelProductId]
    // console.log('selected jewel product',selectedJewelProduct,selectedItem)
    let selectedItemObject = selectedJewelProduct.items.find(it=>it.item==selectedItem)
    let selectedSize = selectedItemObject?selectedItemObject.name:""
    //jewel collection name
    let collectionName = !!selectedJewelProduct?selectedJewelProduct.collectionName:""
    const [textAreaRow, setTextAreaRow] = useState()
    const [quantity,setQuantity] = useState(props?.item?.quantity)
    const [selectedBox,setSelectedBox] = useState(boxProduct)
    const [selectedCard,setSelectedCard] = useState(cardProduct)
    const [newEngravingText,setNewEngravingText] = useState(engravingText)
    const [newNoteText,setNewNoteText] = useState(noteText)
    const [newSelectedJewelProduct,setNewSelectedJewelProduct] = useState(selectedJewelProduct) 
    const [newSelectedColor,setNewSelectedColor] = useState(selectedJewelProduct?.color?.color_text)
    const [newSelectedCordColor,setNewSelectedCordColor] = useState(selectedJewelProduct?.cord_color?.text)
    const [newSelectedSize,setNewSelectedSize] = useState(selectedSize)
    const [newSelectedItem,setNewSelectedItem] = useState(selectedItem)
    const [loading,setLoading] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [disableTypingState,setDisableTypingState] = useState(false)
    // const [noteTextLines, setNoteTextLines] = useState(0);
    const textareaCartRef=useRef();
    const noteTextLimitRef = useRef();
    const textareaWrapperRef=useRef();
    const maxNoteTextHeightRef=useRef();
    const oldComment = props.item.comment
    const newComment = JSON.stringify({mainJewelProductId,selectedJewelProductId:newSelectedJewelProduct.product,boxChoice:selectedBox?.items[0]?.item,cardChoice:selectedCard?.items[0]?.item,selectedItem:newSelectedItem,engravingText:newEngravingText,noteText:newNoteText})
    const [nextDisabled,_setNextDisabled] = useState(false)
    const nextDisabledRef = useRef(nextDisabled);
    const setNextDisabled = data => {
        nextDisabledRef.current = data;
        _setNextDisabled(data);
    };
    function keyDownHandler(e){
        if(window.innerWidth > MOBILE_BREAKPOINT){
            if(nextDisabledRef.current){
                if(e.keyCode == 8 || e.key == "Backspace"){
                    setDisableTypingState(false)
                } else {
                    setDisableTypingState(true)
                }
            } else {
                setDisableTypingState(false)
            }
        }
    } 
    
    useEffect(()=>{
        setNextDisabled(disableNext)
    },[disableNext])

    let oldSections = [
        {
            section: giftBoxSection.section,
            item: boxChoice
        },
        {
            section: postCardSection.section,
            item: cardChoice
        },
        {
            section: jewelSection.section,
            item: selectedItem
        }
    ]
    let newSections = [
        {
            section: giftBoxSection.section,
            item: selectedBox?.items[0]?.item
        },
        {
            section: postCardSection.section,
            item: selectedCard?.items[0]?.item
        },
        {
            section: jewelSection.section,
            item: newSelectedItem
        }
    ]
    if(mainJewelProduct.product_type_value=="cord"){
        //in onlycord product and related products, find cord color and metal color matching selected jewel product
        let cordOnlyProduct = props.gifting.bundle[props.item.product.product].bundleInfo.sectionProducts.find(p=>p.product_type_value=="onlycord")
        if(cordOnlyProduct){
            (function () {
                let matchingCordProduct = null
                if(
                    selectedJewelProduct?.color?.color_hex==cordOnlyProduct?.color?.color_hex &&
                    selectedJewelProduct?.cord_color?.hex==cordOnlyProduct?.cord_color?.hex
                ){
                    matchingCordProduct = cordOnlyProduct
                } else {
                    //look through related products
                    if(Array.isArray(cordOnlyProduct.relatedProducts)){
                        matchingCordProduct = cordOnlyProduct.relatedProducts.find(p=>
                            selectedJewelProduct?.color?.color_hex==p?.color?.color_hex &&
                            selectedJewelProduct?.cord_color?.hex==p?.cord_color?.hex
                        )
                    }
                }
                let cordSection =  props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[3]
                oldSections.push({
                    section: cordSection.section,
                    item: matchingCordProduct?.items[0]?.item
                })
            })();
            (function () {
                let matchingCordProduct = null
                if(
                    newSelectedJewelProduct?.color?.color_hex==cordOnlyProduct?.color?.color_hex &&
                    newSelectedJewelProduct?.cord_color?.hex==cordOnlyProduct?.cord_color?.hex
                ){
                    matchingCordProduct = cordOnlyProduct
                } else {
                    //look through related products
                    if(Array.isArray(cordOnlyProduct.relatedProducts)){
                        matchingCordProduct = cordOnlyProduct.relatedProducts.find(p=>
                            newSelectedJewelProduct?.color?.color_hex==p?.color?.color_hex &&
                            newSelectedJewelProduct?.cord_color?.hex==p?.cord_color?.hex
                        )
                    }
                }
                let cordSection =  props.gifting.bundle[props.item.product.product].bundleInfo.bundle.bundleInfo.sections[3]
                newSections.push({
                    section: cordSection.section,
                    item: matchingCordProduct?.items[0]?.item
                })
            })();
        }
    }
    const oldReqBody = {
        item:props.item.item,
        comment:oldComment,
        quantity:props.item.quantity,
        sections:oldSections
    }
    const newReqBody = {
        item:props.item.item,
        comment:newComment,
        quantity,
        sections:newSections
    }
    
    const saveEnabled = !isEqual(newReqBody,oldReqBody)

    function getLinesCount() {
        var element = noteTextLimitRef.current;
        if(element){
            var prevLH = element.style.lineHeight;
            var factor = 1000;
            element.style.lineHeight = factor + 'px';
            var height = element.getBoundingClientRect().height;
            element.style.lineHeight = prevLH;
            return Math.floor(height / factor);
        } else {
            return 0
        }
    }
   
    let noteTextLines = getLinesCount()
    let disableTyping = noteTextLines==15?true:false
    // console.log("noteTextLines",noteTextLines);
    function textareaValue(event){
        if(!disableTypingState){
            setNewNoteText(event.target.value);
        }
        // setTextAreaRow(textareaCartRef.current.scrollHeight)
        setTimeout(()=>{
            checkNoteTextHeight()
        },10)
    }
    function checkNoteTextHeight(){
        let maxHeight = maxNoteTextHeightRef.current?.getBoundingClientRect().height;
        let currentHeight = noteTextLimitRef.current?.getBoundingClientRect().height;
        if(currentHeight > maxHeight)
            setDisableNext(true)
        else
            setDisableNext(false)
    }
    function handleBoxChange(productId){
        let newBox = giftBoxProducts.find(p=>p.product==productId)
        if(!!newBox)
        setSelectedBox(newBox)
    }
    function handleCardChange(productId){
        let newBox = postCardProducts.find(p=>p.product==productId)
        if(!!newBox)
        setSelectedCard(newBox)
    }
    function sizeChange(val){
        setNewSelectedSize(val)
        if(val!=""){
            let item = newSelectedJewelProduct.items.find(it=>it.name==val)
            if(!!item){
                setNewSelectedItem(item.item)
            }
        } 
    }
    function colorChange(val){
        setNewSelectedColor(val)
        // let p = newSelectedJewelProduct.customisation_template=="diamond_and_color"?getProductBasedOnColorAndDiamonds(val,newSelectedJewelProduct.number_of_diamonds_text,mainJewelProduct):getProductBasedOnColor(val,mainJewelProduct)
        // if(!!p){
        //     setNewSelectedJewelProduct(p)
        //     let item = p.items.find(it=>it.name==newSelectedSize)
        //     if(item)
        //         setNewSelectedItem(item.item)
        //     else{
        //         setNewSelectedItem(null)
        //         setNewSelectedSize("")
        //     }
        // }
    }
    function cordColorClick(cordColor){
        // console.log('cord color click',cordColor)
        setNewSelectedCordColor(cordColor.text)
    }
    useEffect(()=>{
        let p = null
        if(mainJewelProduct.customisation_template=="diamond_and_color"){
            p = getProductBasedOnColorAndDiamonds(newSelectedColor,selectedJewelProduct.number_of_diamonds_text,mainJewelProduct)
            // console.log('get product based on color and diamond',p)
        } else if(mainJewelProduct.product_type_value=="cord"){
            // console.log('get product based on color and cord color')
            p = getProductBasedOnColorAndCordColor(newSelectedColor,newSelectedCordColor,mainJewelProduct)
        } else {
            // console.log('get product based on only color')
            p = getProductBasedOnColor(newSelectedColor,mainJewelProduct)
        }
        if(!!p){
            setNewSelectedJewelProduct(p)
            let item = p.items.find(it=>it.name==newSelectedSize)
            if(item)
                setNewSelectedItem(item.item)
            else{
                setNewSelectedItem(null)
                setNewSelectedSize("")
            }
        }
    },[newSelectedColor,newSelectedCordColor])
    async function addOldBundleBackToCart(){
        try{
            let token = localStorage.getItem(TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${ECOMMERCE_URI}/items/bundles/${props.item.item}`,{
                method:'POST',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(oldReqBody)
            })
            // console.log(rawResponse.status)
            if(rawResponse.status==201){
                // show cart animation
                // console.log('added bundle to cart old')
                // dispatch(setShowNotification("Added gift to cart"))
                // setTimeout(()=>{
                //     dispatch(setShowNotification(null))
                // },2000)
                let selection = await rawResponse.json()
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                props.storeSelection(selection)
            } else {
                throw "bundle add to cart response status not 201"
            }
            setLoading(false)
        } catch(err) {
            setLoading(false)
        }   
    }
    async function addBundleToCart(){
            try{
                let token = localStorage.getItem(TOKEN_VAR_NAME)
                const rawResponse = await fetch(`${ECOMMERCE_URI}/items/bundles/${props.item.item}`,{
                    method:'POST',
                    headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(newReqBody)
                })
                // console.log(rawResponse.status)
                if(rawResponse.status==201){
                    // show cart animation
                    // console.log('added bundle to cart')
                    // dispatch(setShowNotification("Added gift to cart"))
                    // setTimeout(()=>{
                    //     dispatch(setShowNotification(null))
                    // },2000)
                    let selection = await rawResponse.json()
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                    props.setEditItem(null)
                } else {
                    throw "bundle add to cart response status not 201"
                }
                setLoading(false)
            } catch(err) {
                setLoading(false)
                addOldBundleBackToCart()
            }   
    }
    async function saveChanges(){
        //delete current line item
        //add new line item
        if(saveEnabled && !disableNext){
            setLoading(true)
            //delete current line item
            try{
                let token = localStorage.getItem(TOKEN_VAR_NAME)
                const rawResponse = await fetch(`${ECOMMERCE_URI}/lines/${props.item.line}`,{
                    method:'DELETE',
                    headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                if(rawResponse.status==200){
                    // console.log('removed existing bundle')
                    addBundleToCart()
                } else {
                    // console.log('remove bundle response not 200')
                    setLoading(false)
                }    
            } catch(err) {
                setLoading(false)
                // console.log('remove bundle error')
            } 
        }
    }
    async function deleteGift(){
        setLoading(true)
        try{
            // alert("entering try")
            let token=localStorage.getItem(TOKEN_VAR_NAME);
            let line=props.item.line;
            // console.log("line",line)
            const response=await fetch(`${ECOMMERCE_URI}/lines/${line}`,{
                method:'DELETE',
                headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                }
            })
            if(response.status==200){
                let selection=await response.json();
                // console.log("selection data in delete gift",selection)
                props.tempSaveCartItem([getObjectToPushToWishlist(props.item)])
                props.setEditItem(null);
                props.storeSelection(selection);
                setLoading(false)
                onRemoveSingleItemFromCart(props.item,props.cache,props.selection)
            }else{
                // console.log("invalid request")
                let data=await response.json()
                // console.log(data);
                setLoading(false)
            }
            props.setUndoMessage(t('itemDeleted'))
            props.deleteButtonClicked();
            // setTimeout(()=>{
            //     props.setUndoMessage("")
            // },HIDE_UNDO_MESSAGE_TIMER)
        }catch(err){
            setLoading(false)
            // console.log(err);
        }
        
    }
    async function addGiftToWishlist(){
        let giftsInWishlist = JSON.parse(JSON.stringify(props.selection.cartItems))
        let giftItemToPush = getObjectToPushToWishlist(props.item)
        props.tempSaveCartItem([giftItemToPush])
        giftsInWishlist.unshift(giftItemToPush)
        props.updateCartLikes(giftsInWishlist,props?.selection?.selection.loggedIn,true,props.cookieConsent.functional)
        let token=localStorage.getItem(TOKEN_VAR_NAME);
        let line=props.item.line;
        // console.log("line",line)
        let request=await fetch(`${ECOMMERCE_URI}/lines/${line}`,{
            method:'DELETE',
            headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
            }
        })
        if(request.status==200){
            let selection=await request.json();
            // console.log("delete is  a success",selection)
            props.setEditItem(null)
            props.storeSelection(selection)
            onRemoveSingleItemFromCart(props.item,props.cache,props.selection)
        }else{
            // alert("delete is a failure")
            // console.log(request.status)
            let errInfo=await request.json();
            // console.log("unsuccessfull in deleting item",errInfo)
        }
        props.setUndoMessage(t('giftItemIsMovedToWishlist'))
        setTimeout(()=>{
            props.setUndoMessage("")
        },HIDE_UNDO_MESSAGE_TIMER)
    }
    
    // console.log('***********************************')
    // console.log('newReqBody',newReqBody)
    // console.log('oldReqBody',oldReqBody)
    // console.log('***********************************')
    let selectedBoxImage = !!selectedBox?selectedBox?.media?.small[0]:null
    let selectedCardImage = !!selectedCard?selectedCard?.media?.small[0]:null
    let selectedJewelProductImage = !!newSelectedJewelProduct?getProductImage(newSelectedJewelProduct,"v1","small"):null
    let colorOptions = getColorOptions(mainJewelProduct)
    // console.log('mainJewelProduct',mainJewelProduct)
    // console.log('selectedSize',newSelectedSize)
    // console.log('selectedColor',newSelectedColor)
    // console.log('selectedItem',newSelectedItem)
    let engravingCharacterLimit = newSelectedJewelProduct.engraving_character_limit_value?newSelectedJewelProduct.engraving_character_limit_value:DEFAULT_ENGRAVING_CHARACTER_LIMIT

    // Limit Lines

 
    return (
        <>
            {!loading &&
                <div className="editView">
                    <div style={{animationDelay:"0.1s"}} className="mainHeadingSection fadeUpAnimation">
                        <div className="giftBoxSectionHeading font16-notResponsive anoRegular">{t('editGiftBoxPart1')} {collectionName} {t('editGiftBoxPart2')}</div>
                        <div onClick={()=>props.setEditItem(null)} className="font16 anoRegular inlineBlock underlineLR active">{t('cancel')}</div>
                    </div> 
                    <div className="boxAndCard">
                        <div className="boxSection">
                            <div>
                                <LazyImage
                                    alt="Box"
                                    originalSrc={selectedBoxImage}
                                    width={308}
                                    height={323}
                                />
                                <div className="selectWrapper">
                                    <select className="artistName anoRegular font16-notResponsive" onChange={(e)=>handleBoxChange(e.target.value)} value={!!selectedBox?selectedBox.product:""}>
                                        {giftBoxProducts.map(giftBox=>{
                                            return <option key={giftBox.uri} value={giftBox.product}>{giftBox.name}</option>
                                        })}
                                    </select>
                                    <div className="caretDown">
                                        <Caret color="black" direction="down" width="0.1rem" length="0.6rem" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="artistName anoRegular font16">
                                <span>[Artist Name]</span>
                                <span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.4rem"/></span>
                            </div> */}
                        </div>
                        <div className="cardSection">
                            <div className="cardImageWrapper">
                                <div className="cardImage">
                                    <LazyImage
                                            alt="Post card"
                                            originalSrc={selectedCardImage}
                                            width={224}
                                            height={314}
                                    />
                                </div>
                            </div>
                            <div className="selectWrapper">
                                <select className="artistName anoRegular font16-notResponsive" onChange={(e)=>handleCardChange(e.target.value)} value={!!selectedCard?selectedCard.product:""}>
                                    {postCardProducts.map(postCard=>{
                                        return <option key={postCard.uri} value={postCard.product}>{postCard.name}</option>
                                    })}
                                </select>
                                <div className="caretDown">
                                    <Caret color="black" direction="down" width="0.1rem" length="0.6rem" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div ref={textareaWrapperRef} className="textInput cardText positionRelative">
                        <textarea ref={textareaCartRef} onKeyDown={(e)=>keyDownHandler(e)}  onChange={event=>{textareaValue(event)}} maxlength={1000} value={newNoteText} rows='2'></textarea>
                        {/* <textarea ref={textareaCartRef} onChange={e=>{props.setNoteText(props.bundleId,e.target.value);setTextAreaRow(textareaCartRef.current.scrollHeight);countLines()}} maxlength={`${disableTyping?props.gifting.bundle[props.bundleId].noteText.length:615}`} rows='1' placeholder="" value={props.gifting.bundle[props.bundleId].noteText} className="font24"></textarea> */}
                        {/* <h4 className="textCount anoRegular grey">({15 - noteTextLines})</h4> */}
                        <h4 className="placeHolder anoRegular grey">{t('note')}</h4>
                        {disableNext && <h4 className="textExceedingMsg positionAbsolute anoRegular error">{t('noteCharacterLimitDesc')}</h4>}
                    </div>
                    <div className="editProduct">
                        <div className="pLeft">
                            <LazyImage
                                    alt="Box"
                                    originalSrc={selectedJewelProductImage}
                                    width={400}
                                    height={400}
                            />
                        </div>
                        <div className="pRight anoRegular font16-notResponsive">
                            <div className="productName ">{newSelectedJewelProduct.name}</div>
                            <div className="variations">
                                <div className="sizeAndMaterial"> 
                                    {newSelectedJewelProduct?.itemTable?.desc!="One Size" &&
                                        <div className="selectWrapper2">
                                            <select className="sizeDropDown anoRegular font16-notResponsive" value={newSelectedSize} onChange={(e)=>sizeChange(e.target.value)}>
                                                <option value="">{t('selectSize')}</option>
                                                {newSelectedJewelProduct.items.map(sizeItem=>{
                                                    return <option key={sizeItem.item} value={sizeItem.name}>{sizeItem.name}</option>
                                                })}
                                            </select>
                                            <div className="caretDown">
                                                <Caret color="black" direction="down" width="0.1rem" length="0.6rem" />
                                            </div>
                                        </div>
                                    }
                                    <div className="selectWrapper2">
                                        <select className="materailDropDown anoRegular font16-notResponsive" value={newSelectedColor} onChange={(e)=>colorChange(e.target.value)}>
                                            <option value="">{t('selectColor')}</option>
                                            {colorOptions.map(color=>{
                                                return <option key={color} value={color}>{color}</option>
                                            })}
                                        </select>
                                        <div className="caretDown">
                                            <Caret color="black" direction="down" width="0.1rem" length="0.6rem" />
                                        </div>
                                    </div>
                                </div>
                                {mainJewelProduct.product_type_value=="cord" &&
                                    <div className="cordColorSelector">
                                        <span className="cordColorTitle">{t('cordColor')}</span>
                                        <CordColors currentSelectedProduct={newSelectedJewelProduct} product={mainJewelProduct} cordColorClick={cordColorClick} />
                                    </div>
                                }
                            </div>
                            {newSelectedJewelProduct.engraving_possible=="1" &&
                                <div className="engravingText positionRelative">
                                    <Input focus={true} type="text" placeHolder="Engraving" value={newEngravingText} maxlength={engravingCharacterLimit} onChangeValue={(e)=>setNewEngravingText(e.target.value)}/>
                                    <h4 className="engravingTextCount anoRegular grey">({parseInt(engravingCharacterLimit) - newEngravingText.length})</h4>
                                </div>
                            }
                            <div className="quantity positionRelative">
                                <div className="quantityInput">
                                    <Input focus={true} type="number" placeHolder="Quantity" value={quantity} onChangeValue={(e)=>setQuantity(e.target.value)} textAlignClass="alignCenter" paddingRight="0" />
                                </div>
                            </div>
                            <div className="removeAndPrice">
                                {/* {editViewData.products.length>1 && <div className="underlineLR active inlineBlock">Remove item</div>} */}
                                <div className="price grey">{formatPrice(newSelectedJewelProduct.price)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="noteTextLimitReference positionAbsolute">
                         <div className="noteTextContainer width-100">
                            <div ref={maxNoteTextHeightRef} className="maxHeightHolder width-100">
                                <span ref={noteTextLimitRef} className="font12 canelaThin">{newNoteText}</span>
                            </div>
                         </div>
                    </div>
                </div>
            }
            {loading &&
                <div className="loader text-center">
                    <span className="dots inlineBlock">
                        <Loader type="dots" size={8} color="#787878"/>
                    </span>
                </div>
            }
            <div className="editBottomSection">
                <div className="buttons">
                    <div className="hideForMobile"><button className={`btnSmall anoRegular font16 ${saveEnabled && !disableNext ?"btnPrimary":"btnInactive"}`} onClick={()=>saveChanges()}>{t('saveChanges')}</button></div>
                    <div className="showForMobile"><button className={`btnSmall anoRegular font16 ${saveEnabled && !disableNext ?"btnPrimary":"btnInactive"}`} onClick={()=>saveChanges()}>{t('save')}</button></div>
                    <div><button className="btnSmall btnSecondary anoRegular font16" onClick={()=>props.setEditItem(null)}>{t('cancel')}</button></div>
                </div>
                <div className="moveOrDelete anoRegular font16">
                    <div className="underlineLR active" onClick={()=>addGiftToWishlist()}>{t('moveGiftBoxToWishlist')}</div>
                    <div className="underlineLR active" onClick={()=>deleteGift()}>{t('deleteGift')}</div>
                </div>
            </div>
            <style jsx>{`
                .cardImage{
                    width: 60%;
                    margin-top: 2rem;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 1px 1px 4px #878787;
                }
                .selectWrapper{
                    margin-top:0.8rem;
                }
                .selectWrapper,.selectWrapper2{
                    position:relative;
                }
                .selectWrapper .caretDown{
                    position: absolute;
                    right: 0.1rem;
                    top: 1rem;
                    pointer-events:none;
                }
                .selectWrapper select,.selectWrapper2 select{
                    width:100%;
                }
                .selectWrapper select{
                    padding: 1rem 3rem 1rem 0;
                }
                .selectWrapper2 .caretDown{
                    position: absolute;
                    right: 0.5rem;
                    top: 0.7rem;
                    pointer-events: none;
                }
                .selectWrapper2{
                    width:12rem;
                }
                .selectWrapper2 select{
                    padding: 1rem 1.5rem 1rem 0;
                }
                .quantity{
                    margin-top:3.4rem;
                    margin-bottom:2.4rem;
                    display:flex;
                    justify-content:flex-end;
                }
                .editBottomSection .buttons .showForMobile button{
                    font-size:16px;
                    padding:12px 25px;
                }
                .textExceedingMsg{
                    bottom:-21px;
                    right:0;
                }
                .noteTextLimitReference{
                    background:#9e9e9e;
                    width:250px;
                    height:350px;
                    top:10rem;
                    right:1000%;
                    opacity:0;
                }
                .noteTextContainer{
                    padding:11.4% 16.66% 22.8%;
                    height:100%;
                }
                .maxHeightHolder{
                    height:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    overflow:hidden;
                }
                .noteTextLimitReference span{
                    white-space: pre-wrap;
                    display:inline-block;
                    line-height:14px;
                    overflow-wrap: anywhere;
                    font-size:9px;
                }
                .quantityInput{
                    width:6rem;
                }
                .productName{
                    margin-bottom:1.4rem;
                }
                .dots{
                    margin:25.8rem auto 0 auto;
                }
                .editView{
                    padding:12.8rem 6.4rem 0rem 6.4rem;
                }
                .loader{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height:100%;
                }
                .mainHeadingSection{
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:3.2rem;
                }
                .boxAndCard{
                    display:flex;
                    margin-bottom:7.3rem;
                }
                .boxSection img,.cardSection img{
                    margin-bottom:1.6rem;
                }
                .boxSection{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding-right:1.2rem;
                }
                .cardSection{
                    padding-left:1.2rem;
                    display:flex;
                    flex-flow:column nowrap;
                    justify-content:space-between;
                }
                .boxSection, .cardSection{
                    width:50%;
                }
                .artistName .sizeArrow{
                    margin-left:0.8rem;
                    cursor:pointer;
                }
                .textInput{
                    border-bottom:1px solid #000000;
                }
                .textInput textarea{
                    font-family: AnoRegular, sans-serif;
                    font-size:1.6rem;
                    padding:0 0 0.8rem 0;
                    border:0;
                    width:90%;
                    resize: none;
                    line-height: 2.4rem;
                    //height:${textAreaRow}px;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .textInput textarea::-webkit-scrollbar {
                    display: none;
                }
                .textInput.cardText{
                    margin-bottom:4.8rem;
                }
                .textCount, .placeHolder{
                    position: absolute;
                    top: -2.5rem;
                }
                .textCount{
                    right: 0;
                }
                .placeHolder{
                    left: 0;
                }
                .editProduct.multipleProducts .removeAndPrice{
                    display:flex;
                    justify-content:space-between;
                }
                .editProduct .removeAndPrice{
                    text-align:right;
                    margin-bottom:4.8rem;
                }
                .editProduct .engravingText{
                    margin-bottom:2.4rem;
                }
                .editProduct, .sizeAndMaterial{
                    display:flex;
                }
                .sizeAndMaterial{
                    display: flex;
                    justify-content: space-between;
                }
                .pLeft{
                    width:21%;
                }
                .pRight{
                    width:79%;
                    padding-left:2.4rem;
                }
                .variations{
                    margin-bottom:4.8rem;
                }
                .sizeDropDown{
                    margin-right:2.4rem;
                }
                .sizeDropDown, .materailDropDown{
                    cursor:pointer;
                }
                .dropDownArrow{
                    margin-left:0.8rem;
                }
                .engravingTextCount{
                    position:absolute;
                    bottom:3.6rem;
                    right:0;
                    font-size:1.2rem;
                }
                .editBottomSection{
                    padding:1.6rem 6.4rem 4rem 6.4rem;
                    border-top:1px solid #F2F2F2;
                }
                .buttons{
                    display:flex;
                    margin-bottom:3.2rem;
                    margin-left:-1.2rem;
                    margin-right:-1.2rem;
                }
                .buttons div{
                    width:50%;
                    padding-left:1.2rem;
                    padding-right:1.2rem;
                }
                .buttons div button{
                    width:100%;
                    letter-spacing:0px;
                }
                .moveOrDelete div:nth-child(1){
                    margin-right:2.4rem;
                }
                .moveOrDelete div{
                    cursor:pointer;
                }
                .moveOrDelete{
                    display:flex;
                    justify-content:center;
                }
                .cordColorSelector{
                    margin-top:2.4rem;
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .editView{
                        padding:12.8rem 4.8rem 0rem 4.8rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .editView{
                        padding:8.8rem ${paddingRightMobile} 0rem ${paddingLeftMobile};
                    }
                    .mainHeadingSection{
                        margin-bottom:3.6rem;
                    }
                    .pLeft{
                        width:24%;
                    }
                    .pRight{
                        width:76%;
                        padding-left:1.6rem;
                    }
                    .variations{
                        margin-bottom:7.2rem;
                    }
                    .editBottomSection{
                        padding:1.6rem ${paddingLeftMobile} 2.4rem ${paddingRightMobile};
                    }
                    .buttons{
                        margin-bottom:2.4rem;
                    }
                    .noteTextLimitReference{
                        padding: 10px;
                        width:187px;
                        height:270px;
                    }
                    .noteTextLimitReference span{
                        font-size: 8px;
                        line-height: 8px;
                        display: inline-block;
                        overflow-wrap: anywhere;
                        white-space: pre-wrap;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({cache,gifting,selection,cookieConsent}){
    return {cache,gifting,selection,cookieConsent}
}
export default connect(mapStateToProps,{storeSelection,tempSaveCartItem,updateCartLikes})(CartItemEditGift)