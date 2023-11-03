
async function tosignin(){
    let signer;
    let provider;
        signer = null;
        provider;
        if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
        } else {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
            console.log("connected");
            console.log(signer);
        }        
        let k=document.getElementById("arsh")
        k.setAttribute("hidden","");
        let kk=document.getElementById("re")
        kk.setAttribute("hidden","");
        setTimeout(()=>{  window.open("location.html","_self");},1000);
        alert("connected");
      
    }

    async function makeacc(){
        const web3 = new Web3(window.ethereum);   
        let nmn=web3.eth.accounts.create();
        console.log(nmn);
        let bgb=document.getElementById("pk")
        bgb.innerHTML="Private Key<br> "+nmn.privateKey+"<br><br> * Import this acc to your metamask first to start";
        bgb.removeAttribute("hidden","")
    }

    function tometaconnect(){
        setTimeout(()=>{
            let k=document.getElementById("arsh")
            k.removeAttribute("hidden");
            let mk;
            mk=document.getElementById("re").removeAttribute("hidden","")
        },50)
    
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  
    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const dLat = radLat2 - radLat1;
    const dLon = ((Math.PI * lon2) / 180) - ((Math.PI * lon1) / 180);
  
    // Haversine formula to calculate distance
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
  
    return distance; // Distance in kilometers
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////variables for increasing distance and displahying that/////////////////////////////////////////////////// 
  let latitude = 0;
  let longitude = 0;
  let lat1=0;
  let long1=0;
  let lat2=0;
  let long2=0;
  let time=0;
  let res;//globally declared to be able to stop car from another function
  let rate=0.005;//to use in another function
  let ap=0;//to use in another fxn
  let superdistance=0;
  let distance;
  let count;
  let signer;
  let provider;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////on carstart on keypresss/////////////////////////////////////////////////////////////////////////////////////////////
function carstart(){ 
  let main=setInterval(()=>{
      latitude=latitude+0.05
      longitude=longitude+0.01
      time=time+2
  },200
  )

  setTimeout(()=>{clearInterval(main)
        console.log("stopped 1")},20000)
  //////////////////////////////////////////////////////////////
  let a=setInterval(()=>{
      lat1=latitude
      long1=longitude
  },400
  )
  
  setTimeout(()=>{clearInterval(a)
        console.log("stopped 2")},20000)
  //////////////////////////////////////////////////////////////
  let b;
  setTimeout(()=>{b=setInterval(()=>{
      lat2=latitude
      long2=longitude
  },400
  )},200)
  
  setTimeout(()=>{clearInterval(b)
     console.log("stopped 3")},20000)
  ///////////////////////////////////////////////////////////////
  count=0;
  superdistance=0;
  /////////////////////////////////////////////////////////////////////
  function dist(){  
     setTimeout(()=>{res=setInterval(()=>{
       if(count%2==0){
          distance=calculateDistance(lat1, long1,lat2, long2);
       }
       else{
          distance=calculateDistance(lat2, long2,lat1, long1);
       }
       superdistance=superdistance+distance;
       count++
     },200
     )},200)
  }
  /////////////////////////////////////////////////////////////////////
  var hh=document.getElementById("dis")
  setInterval(()=>{
  hh.innerHTML="Distance : "
  hh.innerHTML+=superdistance.toFixed(3)+"M"
  },100
  )
  superdistance = 0;
  dist();
     
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////amount to pay till now//////////////////////////////////////////////////////////////////////////
function pay(){
    if (superdistance !=0){
    ap+=(superdistance*rate);
    let ff=document.getElementById("pay");
    ff.innerHTML="$"+ap;
    clearInterval(res);
        latitude = 0;
        longitude = 0;
        superdistance = 0;
    carstart();
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////stop car gaadirok////////////////////////////////
function gaadirok(){
    ap+=(superdistance*rate);
    let ff=document.getElementById("pay");
    ff.innerHTML="₹"+ap.toFixed(3);
    clearInterval(res);
    latitude = 0;
    longitude = 0;
    superdistance = 0;
}
/*
function lo(){
    let fff=document.getElementById("pay2");
    fff.innerHTML="₹"+ap.toFixed(3);
    console.log("aa gye");
}*/

async function trans(){
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    console.log(signer)
      const toAddress = "0x0952EAF1AC0972B2C66D73206c1351593E50EaB5";

      // The amount to send (in wei)
      const ineth=ap.toFixed(4);
      const value =BigInt(ineth*10000000000000000); // 0.01 ETH

      // Create a transaction
      const transaction = {
        to: toAddress,
        value: value,
      };

      // Send the transaction
      const txResponse = await signer.sendTransaction(transaction);
      console.log("Transaction hash:", txResponse.hash);

      if (ap!=0){
        console.log("successfully paid : $ "+ap);
        ap=0;
        let ff=document.getElementById("pay");
        ff.innerHTML="$"+ap;
    }

}


function sendindirect(){
    console.log("opop");
    const provider=new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6680b7be8f28452f9d0982c7cf38fb6d");
    const acc1="0xB479279Ff47ed3Bfc2638A1994B1B42771D78421";
    const acc2="0x852e4C29D09bC0262F54E2ce0378d1FC95241A83";
    const pkeyy="6079e345db4e3cc37cc0865b45acb854385eab057fb2d7d16beec77809261c77";
    const wallet=new ethers.Wallet(pkeyy,provider);
    const main= async ()=>{
        const tx= await wallet.sendTransaction(
            {
                from:acc1,
                to: acc2 ,
                value: BigInt(1)
            }
        )
        console.log(tx);
    }
    main();
    
}

function rem(){
    document.getElementById("an").removeAttribute("hidden","");
    setTimeout(()=>{
        document.getElementById("an").setAttribute("hidden","hidden");
    },5000)
    console.log("ppp");
}