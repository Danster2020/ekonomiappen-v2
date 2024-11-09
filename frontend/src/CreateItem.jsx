import { Footer } from './components/Footer'
import ItemForm from './components/ItemForm'

export const CreateItem = () => {

    return (
        <>
            <ItemForm title={"Lägg till"} autofocusTitle={true}></ItemForm>
            <Footer></Footer>
        </>
    )
}
