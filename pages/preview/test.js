export default function test(){
    return <p>Test</p>
}
export async function getServerSideProps({params,locale}){
    throw "error"
    return {props:{test:"123"}}
}