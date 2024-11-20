import { FormControl, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { Book } from '../lib/types'
interface BookFormProps {
    book: Partial<Book>;
    onChange: (updatedBook: Partial<Book>) => void;
  }
  
const BookForm = ({ book, onChange }: BookFormProps) => {
    return (
      <div className="grid gap-4 py-4">
        <TextField
          label="タイトル"
          value={book.title}
          onChange={(e) => onChange({ ...book, title: e.target.value })}
          fullWidth
        />
        <TextField
          label="ISBN"
          value={book.isbn}
          onChange={(e) => onChange({ ...book, isbn: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>場所</InputLabel>
          <Select
            value={book.location}
            onChange={(e) => onChange({ ...book, location: e.target.value as 'shelf' | 'owner' })}
          >
            <MenuItem value="shelf">本棚</MenuItem>
            <MenuItem value="owner">所有者</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="所有者ID"
          value={book.ownerIds?.join(', ')}
          onChange={(e) => {
            const updateOwenersIds = e.target.value.split(',').map((id) => id.trim());
            onChange({ ...book, ownerIds: updateOwenersIds })
          }}
          fullWidth
        />
      </div>
    )
  }
  
  export default BookForm;