export const mappingStatus = (status) => {
    if (status === "waiting") {
      return <span style={{ color: "#ff8d39" }}>Chưa thanh toán</span>
    } else if (status === "active") {
      return <span style={{ color: "#4bcaa0" }}>Đang hiển thị</span>
    } else if (status === "delete") {
      return <span style={{ color: "red" }}>Đã xoá</span>
    } else if (status === "inactive") {
      return <span style={{ color: "gray" }}>Đã hết hạn</span>
    }
  };

export var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});