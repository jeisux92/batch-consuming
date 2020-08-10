# batch-consuming 

batch-consuming allows you to do multiples request by batch to determined end points in three simple steps.

1. Set an url and configure your headers

        const url = `your end point url`
        let headers = {
         Authorization: `${configuration.authType} ${configuration.token}`,
         ContentType: 'application/json'
        }

2. Create a new instance of `BatchConsuming`

        const service = new BatchConsuming(url, headers);

3. Call the method `executeAsync` and pass both the batch size and the payload array 

        const result = await connect.executeAsync(30, payload)

That's it!