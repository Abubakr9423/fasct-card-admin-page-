import { useAddProductStore } from "@/store/addProductStore"
import { useState } from "react"

const CreateColorModal = ({ onClose }: { onClose: () => void }) => {
  const [color, setColor] = useState("#000000")
  const { createColor } = useAddProductStore()

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 space-y-4">
        <h2 className="font-semibold">Create Color</h2>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              await createColor(color)
              onClose()
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateColorModal
