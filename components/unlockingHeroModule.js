import React from 'react'
import { connect } from 'react-redux';
function heroModuleDynamic(props) {

    return (
       <>
        <div style={{height:`${props.common.windowHeight2}px`}} className="container">
        </div>
        <style jsx>{`
            .container{
                background:transparent;
            }
        `}</style>
       </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(heroModuleDynamic)