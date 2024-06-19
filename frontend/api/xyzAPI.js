import { URL } from "./APIconst";
import axios from "axios";

export const getArrivedPackage = async(page) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Packages = await axios.get(URL + "/xyz/get_package", {
            "params": { "p": page }
        })
        .catch((error) => {
            console.error(error);
        });

    return Packages
}

export const getWetLeafDatas = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const WetLeaves = await axios.get(URL + "/xyz/get_wet_datas")
        .catch((error) => {
            console.error(error);
        });

    return WetLeaves
}

export const getWetStats = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const WetDatas = await axios.get(URL + "/xyz/quick_get_wet_stats", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return WetDatas
}

export const getWetSummary = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const WetDatas = await axios.get(URL + "/xyz/get_wet_summary", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return WetDatas
}

export const getDryStats = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const DryDatas = await axios.get(URL + "/xyz/quick_get_dry_stats", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return DryDatas
}

export const getDryLeafDatas = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const DryLeaves = await axios.get(URL + "/xyz/get_dry_datas")
        .catch((error) => {
            console.error(error);
        });

    return DryLeaves
}

export const getDrySummary = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const DryDatas = await axios.get(URL + "/xyz/get_dry_summary", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return DryDatas
}

export const getFlourStats = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const FlourDatas = await axios.get(URL + "/xyz/quick_get_flour_stats", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return FlourDatas
}

export const getFlourDatas = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const FlourLeaves = await axios.get(URL + "/xyz/get_flour_datas")
        .catch((error) => {
            console.error(error);
        });

    return FlourLeaves
}

export const getFlourSummary = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const FlourDatas = await axios.get(URL + "/xyz/get_flour_summary", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return FlourDatas
}

export const getPackageSummary = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Package = await axios.get(URL + "/xyz/get_package_summary", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return Package
}

export const getShipmentNotification = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Shipments = await axios.get(URL + "/xyz/get_shipment_notification")
        .catch((error) => {
            console.error(error);
        });

    return Shipments
}

export const getArrivalNotification = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Arrivals = await axios.get(URL + "/xyz/get_arrival_notification")
        .catch((error) => {
            console.error(error);
        });

    return Arrivals
}


export const searchPackage = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Package = await axios.get(URL + "/xyz/get_package_by_id", {
        "params": { "s": data }
    }).catch((error) => {
        console.error(error);
    });
    return Package
}

export const rescalePackage = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Package = await axios.put(URL + "/xyz/rescale/" + data.id, {
        "weight": data.weight,
        "material": data.material
    }).catch((error) => {
        console.error(error);
    });
    return Package
}

export const addReception = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Package = await axios.post(URL + "/xyz/add_reception", data)
        .catch((error) => {
            console.error(error);
        });
    return Package
}

export const getPackages = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Packages = await axios.get(URL + "/xyz/packages")
        .catch((error) => {
            console.error(error);
        });

    return Packages
}

export const getPackageByID = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Package = await axios.get(URL + "/xyz/search_package_rescale", {
        "params": { "s": data }
    }).catch((error) => {
        console.error(error);
    });
    return Package
}

export const getCheckpoints = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Checkpoints = await axios.get(URL + "/xyz/checkpoints")
        .catch((error) => {
            console.error(error);
        });

    return Checkpoints
}

export const getCheckpointStats = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const CheckpointDatas = await axios.get(URL + "/xyz/quick_get_checkpoint_stats", {
            "params": {...data }
        })
        .catch((error) => {
            console.error(error);
        });

    return CheckpointDatas
}

export const getCheckpointSummary = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const CheckpointDatas = await axios.get(URL + "/xyz/get_checkpoint_summary")
        .catch((error) => {
            console.error(error);
        });

    return CheckpointDatas
}


export const getPackagesWithStatus = async(status) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Packages = await axios.get(URL + "/xyz/packages_status", {
            params: { status: status }
        })
        .catch((error) => {
            console.error(error);
        });

    return Packages
}


export const getReceptionPackages = async() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Reception = await axios.get(URL + "/xyz/reception_packages")
        .catch((error) => {
            console.error(error);
        });
    return Reception
}

export const searchReceptionPackages = async (id) => {
    console.log(id)
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const Reception = await axios.get(URL + "/xyz/search_reception", {
        "params":{id}
    })
    .catch((error) => {
        console.error(error);
    });
    return Reception
}

export const getShippingSummary = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const ShippingSummary = await axios.get(URL + "/xyz/get_shipping_summary", {
        "params":{...data}
    })
        .catch((error) => {
            console.error(error);
        });
    return ShippingSummary
}

export const getShippingStats = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const ShippingStats = await axios.get(URL + "/xyz/quick_get_shipping_stats", {
        "params":{...data}
    })
        .catch((error) => {
            console.error(error);
        });
    return ShippingStats
}


export const getShippingInfo = async(data) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    const ShippingInfos = await axios.get(URL + "/xyz/shipping", {
        "params":{...data}
    })
        .catch((error) => {
            console.error(error);
        });
    return ShippingInfos
}