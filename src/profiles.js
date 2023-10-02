import { UpiIds, setUpiIds } from "./upidIds";
export const endpoint = `mam=9&purpose=00&mc=5999&cu=INR&orgid=180001`
setUpiIds();
const profiles = {
    shruthie: {
        name: 'Ms Shruthi Reddy',
        telegram: "Shruthiee",
        age: "24",
        location: "hyderabad",
        upi: UpiIds.paytm1
    },
    ramya: {
        name: 'Ms Ramya Reddy',
        telegram: "RamyaRed5",
        age: "24",
        location: "Vizag",
        upi: UpiIds.paytm1
    },
    arpitha: {
        name: 'Arpitha Reddy',
        telegram: "ArpithaRed7",
        age: "23",
        location: "Mumbai",
        upi: UpiIds.paytm1
    },
    sneha: {
        name: 'Snehaa Reddy',
        telegram: "SnehaRed3",
        age: "22",
        location: "Bangalore",
        upi: UpiIds.paytm1
    },
    meghana: {
        name: 'Ms Meghana Reddy',
        telegram: "MeghanaRed",
        age: "24",
        location: "Bangalore",
        upi: UpiIds.paytm1
    },
    kavya: {
        name: 'Ms Kavya R',
        telegram: "KavyaRed6",
        age: "23",
        location: "Hyderabad",
        upi: UpiIds.paytm1
    },
    sowmya: {
        name: 'Ms Sowmya R',
        telegram: "SowmyaRed3",
        age: "23",
        location: "Bangalore",
        upi: UpiIds.paytm1
    },
    nidhi: {
        name: 'Ms Nidhi R',
        telegram: "NidhiRed2",
        age: "23",
        location: "HiTech City",
        upi: UpiIds.paytm1
    },
    divya: {
        name: 'Ms Divya Sree',
        telegram: "DivyaSree3",
        age: "23",
        location: "LB Nagar",
        upi: UpiIds.paytm1
    },
    keerthi: {
        name: 'Ms Keerthi Naidu',
        telegram: "Keerthi1",
        age: "23",
        location: "Tirupati",
        upi: UpiIds.paytm1
    }
}


export default profiles;