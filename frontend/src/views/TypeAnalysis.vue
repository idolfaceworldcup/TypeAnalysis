<template>
    <div>
        <base-button block type="primary" class=" mb-3" @click="modals.modal1 = true">
            Default
        </base-button>
        <modal :show.sync="modals.modal1">
            <h6 slot="header" class="modal-title" id="modal-title-default">Type your modal title</h6>

            <p>Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                right at the coast of the Semantics, a large language ocean.</p>
            <p>A small river named Duden flows by their place and supplies it with the necessary
                regelialia. It is a paradisematic country, in which roasted parts of sentences
                fly into your mouth.</p>

            <template slot="footer">
                <base-button type="primary">Save changes</base-button>
                <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close
                </base-button>
            </template>
        </modal>
    </div>

</template>

<script>
export default {
}
</script>