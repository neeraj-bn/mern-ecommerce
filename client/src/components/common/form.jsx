import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText,isBtmDisbled }) => {
  console.log("Updated formData:", formData);

  function renderInputsByComponentType(getControlItem) {
    let element = null;

    const value = formData[getControlItem.name] || ''

    switch (getControlItem.componentType) {
      case 'input':
        element = (<Input
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.name}
          type={getControlItem.type}
          value={value}
          onChange={event => setFormData({
            ...formData,
            [getControlItem.name]: event.target.value
          })}
        />);
        break;

      case 'select':
        element = (<Select onValueChange={(value) => setFormData({ ...formData, [getControlItem.name]: value })} value={value}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={getControlItem.label} />

          </SelectTrigger>
          <SelectContent>
            {
              getControlItem.options && getControlItem.options.length > 0 ? getControlItem.options.map(optionItem => (<SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>)) : null
            }
          </SelectContent>
        </Select>);
        break;

      case 'textarea':
        element = (
          <Textarea

            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={event => setFormData({
              ...formData,
              [getControlItem.name]: event.target.value
            })}

          />
        );
        break;

      default:
        element = (<Input
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.name}
          type={getControlItem.type}
        />);
        break;
    }
    return element
  }


  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {
          formControls.map(controlItem => <div className='grid w-full gap-1.5' key={controlItem.name}>
            <label className='mb-1'>{controlItem.label}</label>
            {
              renderInputsByComponentType(controlItem)
            }

          </div>)
        }
      </div>
      <Button disabled ={isBtmDisbled} type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm
