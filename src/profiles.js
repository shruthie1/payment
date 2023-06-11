export const endpoint = `purpose=00&mc=5999&cu=INR&orgid=180001`
export let upiIds = {
    default: "lakshmi-69@paytm"
}

async function setUpiIds() {
    try {
        fetch("https://uptimechecker.onrender.com/getAllUpiIds")
            .then((resp) => {
                if (resp.ok) {
                    return resp.json(); // Parse response body as JSON
                }
            })
            .then((data) => {
                console.log("UPI: ", data); // Log the parsed response data
                upiIds = {
                    ...upiIds,
                    ...data
                }
            })
            .catch((e) => {
                console.log(e); // Handle any errors that occurred during the request
            });
    } catch (error) {
        // Handle any synchronous errors
    }
}
setUpiIds();
const profiles = {
    shruthie: {
        name: 'Ms Shruthi Reddy',
        telegram: "Shruthiee",
        age: "24",
        location: "hyderabad",
        upi: upiIds.paytm1
    },
    ramya: {
        name: 'Ms Ramya Reddy',
        telegram: "RamyaRed5",
        age: "24",
        location: "Vizag",
        upi: upiIds.paytm1
    },
    arpitha: {
        name: 'Arpitha Reddy',
        telegram: "ArpithaRed7",
        age: "23",
        location: "Mumbai",
        upi: upiIds.paytm1
    },
    sneha: {
        name: 'Snehaa Reddy',
        telegram: "SnehaRed3",
        age: "22",
        location: "Bangalore",
        upi: upiIds.paytm1
    },
    meghana: {
        name: 'Ms Meghana Reddy',
        telegram: "MeghanaRed",
        age: "24",
        location: "Bangalore",
        upi: upiIds.paytm1
    },
    kavya: {
        name: 'Ms Kavya R',
        telegram: "KavyaRed",
        age: "23",
        location: "Hyderabad",
        upi: upiIds.paytm1
    },
    sowmya: {
        name: 'Ms Sowmya R',
        telegram: "SowmyaRed1",
        age: "23",
        location: "Bangalore",
        upi: upiIds.paytm1
    },
    nidhi: {
        name: 'Ms Nidhi R',
        telegram: "NidhiRed",
        age: "23",
        location: "HiTech City",
        upi: upiIds.paytm1
    },
    divya: {
        name: 'Ms Divya Sree',
        telegram: "DivyaSree3",
        age: "23",
        location: "LB Nagar",
        upi: upiIds.paytm1
    },
    keerthi: {
        name: 'Ms Keerthi Naidu',
        telegram: "Keerthi1",
        age: "23",
        location: "Tirupati",
        upi: upiIds.paytm1
    }
}


export default profiles;