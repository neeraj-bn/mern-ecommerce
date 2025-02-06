import ProductImageUpload from '@/components/admin-view/image-upload'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { useState } from 'react'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: "",
  salePrice: '',
  totalStock: ''


}

const AdminProducts = () => {
  const [openCreateProductDialog, setCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploaImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false)


  function onSubmit() {


  }

  console.log(formData,"For data")
  return (
    <>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={() => setCreateProductDialog(true)}>Add new Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductDialog} onOpenChange={() => {
          setCreateProductDialog(false)
        }}>
          <SheetContent side="right" className='overflow-auto'>
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploaImageUrl={uploaImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
            <div className='py-6'>
              <CommonForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} buttonText={'Add'} formControls={addProductFormElements} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

    </>
  )
}

export default AdminProducts
