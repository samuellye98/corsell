export const initialState = {
  images: [],
  category: '',
  itemValues: {
    title: '',
    description: '',
    price: '',
    condition: '',
    dealMethod: []
  },
  housingValues: {
    title: '',
    description: '',
    price: '',
    postalCode: '',
    address: '',
    startLease: '',
    endLease: '',
    beds: 1,
    baths: 1,
    features: [],
    utilities: [],
    facilities: [],
    furnishing: '',
    parking: false,
    parkingPrice: '',
    pets: false,
    petsPrice: '',
    agent: false,
    contact: '',
    attachment: []
  },
  uploadSuccess: false,
  uploading: false
}

// Types
export const types = {
  UPLOAD_IMAGES: 'UPLOAD_IMAGES',
  UPLOADING_ITEM: 'UPLOADING_ITEM',
  UPLOADING_HOUSING: 'UPLOADING_HOUSING',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  ITEM_CATEGORY: 'ITEM_CATEGORY',
  RESET_FORM: 'RESET_FORM'
}

// Reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_IMAGES:
      return { ...state, images: action.payload }
    case types.ITEM_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    case types.UPLOADING_ITEM:
      return {
        ...state,
        itemValues: {
          title: action.payload.title,
          description: action.payload.description,
          price: action.payload.price,
          condition: action.payload.condition,
          dealMethod: action.payload.dealMethod
        },
        uploading: true
      }
    case types.UPLOADING_HOUSING:
      return {
        ...state,
        housingValues: {
          title: action.payload.title,
          description: action.payload.description,
          price: action.payload.price,
          postalCode: action.payload.postalCode,
          address: action.payload.address,
          startLease: action.payload.startLease,
          endLease: action.payload.endLease,
          beds: action.payload.beds,
          baths: action.payload.baths,
          features: action.payload.features,
          utilities: action.payload.utilities,
          facilities: action.payload.facilities,
          furnishing: action.payload.furnishing,
          parking: action.payload.parking,
          parkingPrice: action.payload.parkingPrice,
          pets: action.payload.pets,
          petsPrice: action.payload.petsPrice,
          agent: action.payload.agent,
          contact: action.payload.contact,
          attachment: action.payload.attachment
        }
      }
    case types.RESET_FORM:
      return {
        ...initialState
      }
    default:
      return state
  }
}

// Actions

export function uploadImages (payload) {
  return {
    type: types.UPLOAD_IMAGES,
    payload
  }
}

export function setCategory (payload) {
  return {
    type: types.ITEM_CATEGORY,
    payload
  }
}

export function uploadItem (payload) {
  return {
    type: types.UPLOADING_ITEM,
    payload
  }
}

export function uploadHousing (payload) {
  return {
    type: types.UPLOADING_HOUSING,
    payload
  }
}

export function resetForm () {
  return {
    type: types.RESET_FORM
  }
}

// Getters
export function getImages (store) {
  return store.images
}

export function getCategory (store) {
  return store.category
}

export function getUploadSuccess (store) {
  return store.uploadSuccess
}
