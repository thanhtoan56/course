<template>
    <div class="row">
      <div class="col-lg-2">
      </div>
      <div class="col-lg-8">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom"><h6 class="m-0">Add Category</h6></div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feInputState">Parent ID</label>
                        <select id="feInputState" class="form-control">
                          <option selected>Parent Id</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Name Category</label>
                        <input type="text" class="form-control" id="feFirstName" placeholder="" value="" >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="feLastName">Link</label>
                        <input type="text" class="form-control" id="feLastName" placeholder="" value="" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="feFirstName">Image</label>
                        <input type="file" class="form-control" id="feFirstName" placeholder="" value="">
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="feDescription">Tags</label>
                        <textarea class="form-control" name="feDescription" rows="3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?</textarea>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-accent">Add New Catogory</button>
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
