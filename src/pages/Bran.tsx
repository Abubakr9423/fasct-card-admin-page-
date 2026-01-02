import { useGetBrands, type Brand } from "@/store/store";
import { useFormik } from "formik";
import { useEffect } from "react";

const Bran = () => {
    const data = useGetBrands((state) => state.data);
    const getbrands = useGetBrands((state) => state.getbrands);
    const deletebrands = useGetBrands((state) => state.deletebrands);
    const editbrands = useGetBrands((state) => state.editbrands);
    const addbrand = useGetBrands((state) => state.addbrand);

    useEffect(() => {
        getbrands();
    }, [getbrands]);

    const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
        initialValues: {
            id: "",
            brandName: "",
        },
        onSubmit: (values) => {
            const formdata = new FormData();
            formdata.append("id", values.id);
            formdata.append("brandName", values.brandName);

            if (values.id) {
                editbrands(formdata);
            } else {
                addbrand(formdata);
            }
        },
    });

    const handlefield = (brand: Brand) => {
        setFieldValue("brandName", brand.brandName);
        setFieldValue("id", brand.id);
    };

    return (
        <div className="flex justify-between">
            <table className="min-w-[50%] border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((brand: Brand) => (
                        <tr
                            key={brand.id}
                            className="hover:bg-blue-50 transition-colors duration-200"
                        >
                            <td className="px-6 py-3 border-t border-gray-200 text-gray-700">
                                {brand.brandName}
                            </td>
                            <td className="px-6 py-3 border-t flex gap-2 border-gray-200">
                                <button
                                    onClick={() => handlefield(brand)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deletebrands(brand.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border w-[524px] h-[228px] rounded-lg shadow-md p-6 bg-white">
                <h1 className="text-xl font-semibold text-blue-700 mb-4">
                    Add New Brand
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="brandName"
                        value={values.brandName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter brand name"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-700 transition-colors duration-300"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Bran;