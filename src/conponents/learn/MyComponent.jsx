const MyComponent = () => {
    const hieppu = 'hieppuuu';
    return (
        <>
            <div>hi {hieppu}</div>
            <div className='child' style={
                {
                    borderRadius: "10px",
                    color: "red"
                }
            }>hieppu</div>
        </>

    );
}

export default MyComponent;