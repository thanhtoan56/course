<template>
    <div class="row">
      <div class="col-lg-8">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom"> <h6 class="m-0">Add Banner</h6> </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Name Banner</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Url</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feLastName">Alt</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Type</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" >
                      </div>
                    </div>
                    <button type="submit" class="btn btn-accent">Add New Banner</button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default {};
</script>
