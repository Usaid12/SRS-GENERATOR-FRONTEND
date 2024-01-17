import { Hourglass } from "react-loader-spinner";

const Loader = () => {
    return (
        
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"100vh"}}>
           <Hourglass
          visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
            />
            <p style={{fontFamily:"cursive",fontSize:"18px"}}>Please wait while pdf is generating...</p>
      </div>
    
      
  )
}

export default Loader
