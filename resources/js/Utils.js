import moment from "moment";

export const formatDate = (date) => {
    return moment(date);
};

export function formatIDR(amount) {
    const idFormatter = new Intl.NumberFormat("id-ID");
    return idFormatter.format(amount);
}
