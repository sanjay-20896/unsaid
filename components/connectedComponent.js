import {connect} from 'react-redux'
function ComponentName(props){
    return (
        <>
            <div className="wrapper"></div>
            <style jsx>{`

            `}</style>
        </>
    )
}
function mapStateToProps({}){
    return {}
}
export default connect(mapStateToProps,{})(ComponentName)