import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized Access Detected"
                    subtitle="Please log in or sign up to access the content"

                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id,
    })

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you haven't added any properties."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient 
                listings = {listings}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;