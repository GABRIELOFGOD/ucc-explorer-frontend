export const handlleSearch = async (query) => {
  let result = {
    type: "",
    path: ""
  };
  try {
    const request = await search(query);
    switch (request.data.type) {
      case "block":
        result = {
          type: "block",
          path: `/block/${request.data.number}`
        }
        // location.assign(`/block/${request.data.number}`);
        break;
    
      case "transaction":
        result = {
          type: "transaction",
          path: `/block/${request.data.hash}`
        }
        // location.assign(`/tx/${request.data.hash}`);
        break;

      case "address":
        result: {
          type: "address",
          path: `/block/${request.data.address}`
        }
        // location.assign(`/address/${request.data.address}`);
        break

      case "not_found":
        result: {
          type: "not_found",
          path: ""
        }
        // location.assign(`/address/${request.data.address}`);
        break
      
      default:
        result: {
          type: "error",
          path: ""
        }
        break;
    }

    return result;
  } catch (error) {
    throw error;
  }
}