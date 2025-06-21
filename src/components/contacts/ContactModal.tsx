import { Loader, Trash, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { postCustomerAPi, updateCustomerAPi } from "../../Api-Services/ContactApis";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

// Define validation schema


function ContactModal({ handleClose, editData }: any) {
    const queryClient = useQueryClient();
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>("");
    const vendorId: any = import.meta.env.VITE_VENDOR_ID;

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
            .required("Phone is required"),
        tags: yup
            .array()
            .of(yup.object().shape({ name: yup.string().optional() }))
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags",
    });

    useEffect(() => {
        if (editData) {
            setValue("name", editData.name || "");
            setValue("email", editData.email || "");
            setValue("phone", editData.mobileNumber || "");
            setValue(
                "tags",
                Array.isArray(editData.tags)
                    ? editData.tags.map((tag: string) => ({ name: tag }))
                    : []
            );
        }
    }, [editData, setValue]);

    const onSubmit = async (data: any) => {
        setErrorMessage("");
        setLoader(true);
        try {
            const payload = {
                name: data.name,
                email: data.email,
                mobileNumber: data.phone,
                tags: data?.tags?.map((item: any) => item.name),
                vendorId: vendorId
            };
            if (editData) {
                const updateApi = await updateCustomerAPi(`${editData?.id}`, { ...payload, updated_by: vendorId })
                if (updateApi) {
                    reset();
                    queryClient.invalidateQueries(['getCustomerData'] as InvalidateQueryFilters);
                    handleClose();
                }
            } else {
                const updateApi = await postCustomerAPi('', { ...payload, created_by: vendorId })
                if (updateApi) {
                    reset();
                    queryClient.invalidateQueries(['getCustomerData'] as InvalidateQueryFilters);
                    handleClose();
                }
            }
        } catch (error: any) {
            console.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message || "Something went wrong. Please try again.");
            setLoader(false);
        }
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{editData ? 'Edit Contact' : 'Add New Contact'}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                {...register("phone")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Tags</label>
                            <div className="space-y-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2 items-center">
                                        <input
                                            {...register(`tags.${index}.name` as const)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter tag"
                                        />
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => append({ name: "" })}
                                className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
                            >
                                + Add Tag
                            </button>
                            {errors.tags && (
                                <p className="text-red-500 text-sm mt-1">
                                    {(errors.tags as any)?.message || errors.tags[0]?.name?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 text-md text-end">{errorMessage}</p>
                    )}
                    <div className="flex justify-end space-x-3 mt-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loader}
                            type="submit"
                            className="btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {loader ? (
                                <div className="flex gap-2 ">
                                    Loading ... <Loader className="animate-spin" />
                                </div>) : editData ? 'Edit Contact' : ' Add Contact'}

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactModal;
