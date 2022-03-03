import { useState, useEffect } from "react"
import { View } from "react-native"
import { getDoc, doc } from "@firebase/firestore"
import { db } from "../utils/firebase"
import useAuth from "../hooks/useAuth"
import Patient from "../components/Profile/Patient"
import Doc from "../components/Profile/Doc"
import Loader from "../components/Loader";

const MyProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProfile = async () => {
            const profileRef = doc(db, "users", user.uid);
            const profileSnap = await getDoc(profileRef);
            setProfile({ id: profileSnap.id, ...profileSnap.data() })
            setLoading(false);
        }
        fetchProfile();
    }, [db])

    

    return loading ? (
        <Loader />
    ) : (
        <View>
            {profile.isDoctor ? <Doc data={profile} /> : <Patient data={profile} />}
        </View>
    )
}

export default MyProfile;