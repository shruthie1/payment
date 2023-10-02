import { setUpiIds, getClients, UpiIds } from "./upidIds";
export const endpoint = `mam=9&purpose=00&mc=5999&cu=INR&orgid=180001`
setUpiIds();
function selectOne(array) {
    if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const profiles = {}

export async function setProfiles() {
    const apiResponse = await getClients();
    apiResponse.forEach((profileData) => {
        const { clientId } = profileData;
        profiles[clientId] = { name: `Ms ${profileData['name']}`, upi: UpiIds.pa, telegram: profileData['userName'], age: selectOne([20, 21, 22, 23, 24, 25]), location: selectOne(["Tirupati", "LB Nagar", "HiTech City", "Bangalore", "Mumbai", "Hyderabad", "Chennai"]) };
    });

    return profiles
}

export default profiles;