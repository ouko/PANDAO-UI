const Carausel = () => {
    return (<div>
        <div className=" rounded-2xl   p-4 w-[647px] h-[961px]  left-[771px] top-[31.5px] overflow-hidden">
            <img
                src="/S2.svg"
                alt="Background1"
                className=" inset-0 w-[647px]  object-cover -z-10"
            />

        </div>
        <div className="rounded-2xl p-4 w-[647px] h-[961px] overflow-hidden">
            <img
                src="/S3.svg"
                alt="Background1"
                className="inset-0 w-[647px] object-cover -z-10"
            />
        </div>
        <div className=" rounded-2xl   p-4 w-[647px] h-[961px]  left-[771px] top-[31.5px] overflow-hidden">
            <img
                src="/S1.svg"
                alt="Background1"
                className=" inset-0 w-[647px]  object-cover -z-10"
            />

        </div>

    </div>);
}

export default Carausel;