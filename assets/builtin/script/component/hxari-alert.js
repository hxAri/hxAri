const $Alerts = function( i )
{
    if( $Is( i, Boolean ) )
    {
        this.data = [];
    } else {
        this.data = i;
    }
    return( this );
};

$Alerts.prototype.data = [
    {
        type: "info",
        message: "Alert info type."
    },
    {
        type: "error",
        message: "Alert error type."
    },
    {
        type: "success",
        message: "Alert success type."
    },
    {
        type: "warning",
        message: "Alert warning type."
    }
];

const $Alert = {
    data: () => ({
        alerts: []
    }),
    props: {
        errors: {
            type: Array,
            require: true
        }
    },
    mounted: function()
    {
        this.alerts = $Alerts( this.errors ).data;
    },
    methods: {
        close: function( i )
        {
            
        }
    },
    template: `
        <div class="alerts">
            {{ alerts }}
        </div>
    `
};