import { setUpiIds, getClients } from "./upidIds";
export const endpoint = `mam=15&mode=02`
setUpiIds();
function selectOne(array) {
    if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const profiles = {}
let activeProfile = 'shruthi1';

export function setActiveProfile(profile) {
    if (profile) {
        activeProfile = profile
    }
}

export function getActiveProfile() {
    return activeProfile?.toLowerCase()
}

export async function setProfiles() {
    if (Object.keys(profiles).length === 0) {
        const apiResponse = await getClients();
        apiResponse.forEach((profileData) => {
            const { clientId } = profileData;
            profiles[clientId] = { clientId, name: `Ms ${profileData['name']}`, upi: "ReddyGirl@apl", telegram: profileData['userName'], age: selectOne([20, 21, 22, 23, 24, 25]), location: selectOne(["Tirupati", "LB Nagar", "HiTech City", "Bangalore", "Mumbai", "Hyderabad", "Chennai"]) };
        });
    }
    return profiles
}

export default profiles;