<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Product Details</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom"><h6 class="m-0">Product Details</h6></div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="feFirstName">Name Product</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" />
                      </div>
                      <div class="form-group col-md-2">
                        <label for="feLastName">Category ID</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" />
                      </div>
                      
                      <div class="form-group col-md-4">
                        <label for="fePassword">Brand</label>
                        <input type="text" class="form-control" id="" placeholder="" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="feEmailAddress">Size</label>
                        <input type="username" class="form-control" id="" placeholder="" value="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="fePassword">Material</label>
                        <input type="text" class="form-control" id="" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Capacity</label>
                        <input type="text" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputCity">Made</label>
                        <input type="text" class="form-control" id="feInputCity">
                      </div>
                    </div>
                    
                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="feEmailAddress">Type</label>
                        <input type="username" class="form-control" id="" placeholder="" value="" >
                      </div>
                      <div class="form-group col-md-3">
                        <label for="fePassword">Detail</label>
                        <input type="text" class="form-control" id="" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Color</label>
                        <input type="text" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputCity">Sex</label>
                        <input type="text" class="form-control" id="feInputCity">
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="feEmailAddress">Sku</label>
                        <input type="username" class="form-control" id="" placeholder="" value="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="fePassword">Price Origin</label>
                        <input type="text" class="form-control" id="" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Price Promotion</label>
                        <input type="text" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Image Main</label>
                        <input type="file" style="height: auto!important" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="feEmailAddress">User ID</label>
                        <input type="username" class="form-control" id="" placeholder="" value="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="fePassword">Tags</label>
                        <input type="text" class="form-control" id="" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Subimage</label>
                        <input type="text" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="feInputAddress">Add Info</label>
                        <input type="file" class="form-control" id="feInputAddress" placeholder="" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="feDescription">Description</label>
                        <textarea class="form-control" name="feDescription" rows="3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?</textarea>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-accent">Update Product</button>
                    <span>Or</span>
                    <button type="submit" class="btn btn-accent">Add Product</button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
