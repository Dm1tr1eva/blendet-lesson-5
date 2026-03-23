import refs from './refs';
import { setItem } from './local-storage-api';

// console.log(refs);

refs.addItemForm.addEventListener('input', function (e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const rawFormData = {
    title: formData.get('taskName'),
    description: formData.get('taskDescription'),
  };
  setItem(rawFormData)
    

//   refs.addItemForm.reset();
});
