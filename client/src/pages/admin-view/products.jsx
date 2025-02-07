import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, fetchAllProducts } from '@/store/admin/products-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''


}

const AdminProducts = () => {
  const [openCreateProductDialog, setCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch();
  const { toast } = useToast()



  function onSubmit(event) {
    event.preventDefault();
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

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch])

  console.log("image", uploadImageUrl)
  return (
    <>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={() => setCreateProductDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile key={productItem._id} product={productItem} />) : null
        }
      </div>

      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setCreateProductDialog(false)
      }}>
        <SheetContent side="right" className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
          <div className='py-6'>
            <CommonForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonText={'Add'} formControls={addProductFormElements} />
          </div>
        </SheetContent>
      </Sheet>

    </>
  )
}

export default AdminProducts
