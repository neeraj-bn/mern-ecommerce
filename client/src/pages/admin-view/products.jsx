import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { Item } from '@radix-ui/react-select'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  SalePrice: '',
  TotalStock: '',
}

const AdminProducts = () => {
  const [openCreateProductDialog, setCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedID] = useState(null)
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch();
  const { toast } = useToast()



  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?

      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data, "Edited data res")
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setCreateProductDialog(false);
          setCurrentEditedID(null)

        }
      }) :

      dispatch(addNewProduct({ ...formData, image: uploadImageUrl })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setCreateProductDialog(false)
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: 'Product added scuccesfully',

          })
        }
      })
  }

  function handleDelete(getCurrrentProductId){
    dispatch(deleteProduct(getCurrrentProductId)).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    })

  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item);
  }

  useEffect(() => {
    console.log("uploadImageUrl updated: ", uploadImageUrl);
    if (uploadImageUrl) {
      setFormData(prevData => ({
        ...prevData,
        image: uploadImageUrl,
      }));
    }
  }, [uploadImageUrl]);
  

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch])

  console.log("form data...", formData)
  return (
    <>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={() => setCreateProductDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile handleDelete={handleDelete} setFormData={setFormData} setCreateProductDialog={setCreateProductDialog} setCurrentEditedID={setCurrentEditedID} key={productItem._id} product={productItem} />) : null
        }
      </div>

      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setCreateProductDialog(false);
        setCurrentEditedID(null);
        setUploadedImageUrl(null); 
        setImageFile(null); 
        setFormData(initialFormData);
      }}>
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>{
              currentEditedId !== null ? 'Edit Product' : 'Add New Product'
            }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload isEditMode={currentEditedId !== null} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
          <div className='py-6'>
            <CommonForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonText={
              currentEditedId !== null ? 'Edit Product' : 'Add New Product'
            } formControls={addProductFormElements} isBtmDisbled={!isFormValid()} />
          </div>
        </SheetContent>
      </Sheet>

    </>
  )
}

export default AdminProducts
