import { app } from './config'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getDate, getMonthAndYear } from '../utils/Utils'
import imageCompression from 'browser-image-compression';


const storage = getStorage(app)

//--------------------------- Firebase Storage ---------------------------
async function uploadIMG(ruteDB, fileName, file, setUserSuccess, monthAndYear) {
    const imagesRef = ref(storage, `/${ruteDB}/${fileName}`);

    const options = {
        maxWidthOrHeight: undefined,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300
    }

    const compressedFile = file.type != 'image/gif' ? await imageCompression(file, options): file

  
    uploadBytes(imagesRef, compressedFile).then((snapshot) => {
        setUserSuccess("Cargando")
        getList(monthAndYear, postsIMG, setUserPostsIMG,)
    }).catch(e => '');
}


let object = {}
function downloadIMG(fileName, postsIMG, setUserPostsIMG) {

    const imagesRef = ref(storage, `${fileName}`);
    const name = fileName.split('/')[1]
    //console.log(name)
    getDownloadURL(imagesRef)
        .then((url) => {
            //console.log("download")
            object = { ...object, [fileName]: url }
            setUserPostsIMG({ ...postsIMG, ...object })
        })
        .catch((error) => {

        });
}



function getList(monthAndYear, postsIMG, setUserPostsIMG,) {
    //userDB && userDB[monthAndYear] && Object.keys(userDB[monthAndYear]).map((i, index)=>{

    const listRef = ref(storage, `/${monthAndYear}/`)
    //  console.log(monthAndYear)


    listAll(listRef)
        .then((res) => {
            //console.log(res)
            res.items.forEach((itemRef) => {
                //console.log(itemRef)
                downloadIMG(itemRef["_location"]["path_"], postsIMG, setUserPostsIMG)
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log("error storage")
        });
    //})    
}


{/*async function downloadIMG (ruteSTG, postsIMG, setUserPostsIMG) {
    const imagesRef = ref(storage, ruteSTG);
    const data = await getDownloadURL(imagesRef)
    return data
}
*/}

export { uploadIMG, getList }