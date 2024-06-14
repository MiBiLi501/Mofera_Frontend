import axios from 'axios'
import {URL} from "./APIconst"

export const postCollection = (Collection) => {
    Collection = {...Collection}
    console.log(Collection)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/new_collection", Collection)
    .catch((error) => {
        console.error(error);
    });
    console.log("success")
}

export const postWetLeaves = (WetLeaves) => {
    console.log(WetLeaves)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/new_wet_leaves", WetLeaves)
    .catch((error) => {
        console.log(error);
        console.error(error);
    });
    console.log("success")
}

export const postDryLeaves = (DryLeaves) => {
    console.log(DryLeaves)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/new_dry_leaves", DryLeaves)
    .catch((error) => {
        console.error(error);
    });
}

export const postFlour = (Flour) => {
    console.log(Flour)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/new_flour", Flour)
    .catch((error) => {
        console.error(error);
    });
}

export const washWetLeaves = (Data) => {
    console.log(Data)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.put(URL + "/centra/wash_wet_leaves/" + Data.id, {"date": Data.date})
    .catch((error) => {
        console.error(error);
    });
}

export const dryWetLeaves = (Data) => {
    console.log(Data)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.put(URL + "/centra/dry_wet_leaves/" + Data.id, {"date": Data.date})
    .catch((error) => {
        console.error(error);
    });
}

export const flourDryLeaves = (Data) => {
    console.log(Data)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.put(URL + "/centra/flour_dry_leaves/" + Data.id, {"date": Data.date})
    .catch((error) => {
        console.error(error);
    });
}

export const getCollection = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Collection = await axios.get(URL + "/centra/collection")
    .catch((error) => {
        console.error(error);
    });

    return Collection
}

export const getWetLeaves = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const WetLeaves = await axios.get(URL + "/centra/wet_leaves")
    .catch((error) => {
        console.error(error);
    });

    return WetLeaves
}

export const getDryLeavesMobile = async (filterData) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const WetLeaves = await axios.get(URL + "/centra/dry_leaves_mobile", filterData)
    .catch((error) => {
        console.error(error);
    });

    return WetLeaves
}

export const getDryLeaves = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const DryLeaves = await axios.get(URL + "/centra/dry_leaves")
    .catch((error) => {
        console.error(error);
    });

    return DryLeaves
}

export const getFlour = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Flour = await axios.get(URL + "/centra/flour")
    .catch((error) => {
        console.error(error);
    });

    return Flour
}

export const getPackages = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Packages = await axios.get(URL + "/centra/packages")
    .catch((error) => {
        console.error(error);
    });

    return Packages
}

export const postPackage = (Package) => {
    Package = {...Package, "centra_id" : 1}
    console.log(Package)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/add_package", Package)
    .catch((error) => {
        console.error(error);
    });
    console.log("success")
}

export const addShippingInfo = (ShippingInfo) => {
    console.log(ShippingInfo)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.post(URL + "/centra/add_shipping", ShippingInfo)
    .catch((error) => {
        console.error(error);
    });
    console.log("success")
}

export const getShippingInfo = (ShippingInfo) => {
    console.log(ShippingInfo)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    axios.get(URL + "/centra/shipping")
    .catch((error) => {
        console.error(error);
    });
    console.log("success")
}