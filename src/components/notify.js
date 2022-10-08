import { toast } from "react-toastify";

export default function notify(message, type) {
    if (type) {
        toast.success(message, {
            position: "top-right",
            autoClose: 3250,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    } else {
        toast.error(message, {
            position: "top-right",
            autoClose: 3250,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
};
