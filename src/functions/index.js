export const filterRetailers = (retailers,deactive,tag)=> {
    let filteredRetailerKeys = Object.keys(retailers).filter(
        (obj) => !deactive[obj]
      );
      if (tag) {
        filteredRetailerKeys = filteredRetailerKeys.filter((key) => {
          const item = retailers[key];
          if (tag === "Top 10" && item.top10 && item.top10 !== "none")
            return true;
          return item.retailerType === tag;
        });
      }
      return filteredRetailerKeys.map((key) =>retailers[key]);   
}
export const financial = x=> {
  return Number.parseFloat(x).toFixed(2);
}