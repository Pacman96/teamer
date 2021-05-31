
export const selectChildren_oa = (parentID, childID, state, setState) => {
    let obj = {}
    obj = { ...state }
    const exists = obj[parentID]?.filter(i => i === childID)[0] ? true : false
    if (exists) {
        const isOnly = obj[parentID].length === 1
        if (isOnly) {
            delete obj[parentID]
        } else {
            obj[parentID] = obj[parentID].filter(i => i !== childID)
        }
    } else {
        const other = Object.keys(obj).includes(parentID) ? obj[parentID] : []
        obj[parentID] = [...other, childID]
    }
    setState(obj)
}

export const pickChild_oa = (parentID, childID, state, setState) => {
    let obj = {}
    obj = { ...state }
    const exists = obj[parentID] === childID ? true : false
    if (exists) {
        delete obj[parentID]
    } else {
        obj[parentID] = childID
    }
    setState(obj)
}

export const generateID = (ids, start = 1) => {
    let id = Number(start)
    for (let index = id; ids.includes(id); index++) {
        id = index
    }
    return id
}